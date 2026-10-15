import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { AdmissionApplication } from '../types';

export interface PrintReceiptResult {
  success: boolean;
  isDirectPrint: boolean;
  message: string;
}

/**
 * Downloads a high-quality PDF of the admission receipt.
 * Uses html-to-image to avoid OKLCH color parsing errors,
 * producing crisp Bengali text rendering and accurate styling.
 */
export async function downloadAdmissionPdf(
  elementId: string,
  application: AdmissionApplication
): Promise<void> {
  let element = document.getElementById(elementId);
  if (!element) {
    element = document.querySelector<HTMLElement>('[id*="receipt"]') || 
              document.querySelector<HTMLElement>('#admission-modal-receipt-content');
  }

  if (!element) {
    throw new Error(`Receipt element #${elementId} not found for PDF generation`);
  }

  // Capture the rendered DOM element as a high-resolution PNG
  let dataUrl: string;
  try {
    dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: false,
      skipFonts: true, // Prevents CORS errors when reading remote Google Fonts stylesheets
      style: {
        transform: 'none',
        margin: '0',
      },
    });
  } catch (firstErr) {
    console.warn('html-to-image initial pass notice, retrying with fallback settings:', firstErr);
    dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 1.5,
      backgroundColor: '#ffffff',
      skipFonts: true,
    });
  }

  // Measure the generated image's natural dimensions
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load generated receipt image'));
    img.src = dataUrl;
  });

  const imgWidth = img.naturalWidth || img.width || 750;
  const imgHeight = img.naturalHeight || img.height || 1050;

  // Create A4 portrait PDF (210 x 297 mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Margins in mm
  const margin = 10;
  const printWidth = pageWidth - margin * 2;
  const printHeight = (imgHeight * printWidth) / imgWidth;

  if (printHeight <= pageHeight - margin * 2) {
    // Fits cleanly on a single page
    pdf.addImage(dataUrl, 'PNG', margin, margin, printWidth, printHeight, undefined, 'FAST');
  } else {
    // Scale proportionally to fit on one page
    const scaleFactor = (pageHeight - margin * 2) / printHeight;
    const finalWidth = printWidth * scaleFactor;
    const finalHeight = printHeight * scaleFactor;
    const xOffset = (pageWidth - finalWidth) / 2;
    pdf.addImage(dataUrl, 'PNG', xOffset, margin, finalWidth, finalHeight, undefined, 'FAST');
  }

  // Clean filename: e.g. FSDQ-Admission-FSDQ-2026-2161.pdf
  const safeId = (application.id || 'Receipt').replace(/[^a-zA-Z0-9-_]/g, '_');
  pdf.save(`FSDQ-Admission-${safeId}.pdf`);
}

/**
 * Triggers clean print of the admission application receipt.
 * - Handles iframe sandboxing (common in preview environments like AI Studio)
 * - Isolates receipt inside a dedicated print iframe so ONLY the receipt is printed
 * - Synchronizes with the print portal for standard browser print (Ctrl+P)
 * - Automatically falls back to generating a print-ready PDF if the browser suppresses print modals
 */
export async function printAdmissionReceipt(
  elementId: string,
  application: AdmissionApplication
): Promise<PrintReceiptResult> {
  const isIframe = typeof window !== 'undefined' && window.self !== window.top;

  // 1. Locate receipt DOM element
  let receiptEl = document.getElementById(elementId);
  if (!receiptEl) {
    receiptEl = document.querySelector<HTMLElement>('[id*="receipt"]') || 
                document.querySelector<HTMLElement>('#admission-modal-receipt-content');
  }

  // 2. Synchronize content to #printable-receipt-portal for native @media print
  const portal = document.getElementById('printable-receipt-portal');
  if (portal && receiptEl) {
    portal.innerHTML = receiptEl.outerHTML;
  }

  let printWindowTriggered = false;

  // 3. Try dedicated hidden print iframe (prints ONLY the receipt without touching main screen)
  try {
    const existingIframe = document.getElementById('admission-receipt-print-frame');
    if (existingIframe) {
      existingIframe.remove();
    }

    const printFrame = document.createElement('iframe');
    printFrame.id = 'admission-receipt-print-frame';
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    printFrame.style.opacity = '0';
    printFrame.setAttribute('aria-hidden', 'true');
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
    if (frameDoc && receiptEl) {
      frameDoc.open();
      frameDoc.write(`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>ভর্তি আবেদনপত্র - ${application.id}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 12mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background-color: #ffffff !important;
      color: #1C1917 !important;
      font-family: 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .print-sheet {
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      padding: 8px;
    }
    .no-print {
      display: none !important;
    }
  </style>
</head>
<body>
  <div class="print-sheet">
    ${receiptEl.outerHTML}
  </div>
</body>
</html>`);
      frameDoc.close();

      await new Promise((r) => setTimeout(r, 200));

      if (printFrame.contentWindow) {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
        printWindowTriggered = true;
      }
    }
  } catch (iframeErr) {
    console.warn('Iframe printing encountered notice:', iframeErr);
  }

  // 4. Try native window.print() if iframe didn't fire
  if (!printWindowTriggered) {
    try {
      window.print();
      printWindowTriggered = true;
    } catch (winErr) {
      console.warn('window.print notice:', winErr);
    }
  }

  // 5. If in an iframe (e.g. AI Studio preview) or if print dialog might be suppressed by sandbox:
  // Automatically provide the crisp, print-ready PDF download so the user has the physical document immediately!
  if (isIframe || !printWindowTriggered) {
    try {
      await downloadAdmissionPdf(receiptEl ? receiptEl.id : elementId, application);
      return {
        success: true,
        isDirectPrint: printWindowTriggered && !isIframe,
        message: 'আবেদনপত্রের প্রিন্ট কপি প্রস্তুত! ব্রাউজার প্রিভিউয়ের জন্য প্রিন্ট-রেডি অফিশিয়াল PDF ডাউনলোড করা হয়েছে।',
      };
    } catch (pdfErr) {
      console.error('Auto PDF fallback note:', pdfErr);
    }
  }

  return {
    success: true,
    isDirectPrint: true,
    message: 'প্রিন্ট উইন্ডো খোলা হয়েছে।',
  };
}
