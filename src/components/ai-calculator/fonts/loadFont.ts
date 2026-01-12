// Helper to load Roboto font for PDF generation with full Unicode/Cyrillic support
// Fonts are bundled locally for security (no external fetch) and reliability

// Import fonts as ES6 modules for bundling
import robotoRegularUrl from '@/assets/fonts/Roboto-Regular.ttf';
import robotoBoldUrl from '@/assets/fonts/Roboto-Bold.ttf';

const loadFontFromUrl = async (fontUrl: string): Promise<string | null> => {
  try {
    const response = await fetch(fontUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.status}`);
    }
    const fontData = await response.arrayBuffer();
    
    // Convert ArrayBuffer to base64
    const fontDataArray = new Uint8Array(fontData);
    let binary = '';
    fontDataArray.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    const base64FontData = btoa(binary);
    
    return base64FontData;
  } catch (err) {
    console.error('Failed to load font:', err);
    return null;
  }
};

export const loadMontserratFont = async (): Promise<string | null> => {
  // Roboto Regular - bundled locally for security
  return loadFontFromUrl(robotoRegularUrl);
};

export const loadMontserratBoldFont = async (): Promise<string | null> => {
  // Roboto Bold - bundled locally for security
  return loadFontFromUrl(robotoBoldUrl);
};

// Legacy exports for backward compatibility
export const loadPTSansFont = loadMontserratFont;
export const loadPTSansBoldFont = loadMontserratBoldFont;
