// Helper to load Montserrat font for PDF generation with Cyrillic support
// Using static TTF files from Google Fonts with full Unicode coverage

export const loadMontserratFont = async (): Promise<string | null> => {
  try {
    // Montserrat Regular - full character set including Cyrillic
    const response = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/montserrat@latest/cyrillic-400-normal.ttf');
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
    console.error('Failed to load Montserrat font:', err);
    return null;
  }
};

export const loadMontserratBoldFont = async (): Promise<string | null> => {
  try {
    // Montserrat Bold - full character set including Cyrillic
    const response = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/montserrat@latest/cyrillic-700-normal.ttf');
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
    console.error('Failed to load Montserrat Bold font:', err);
    return null;
  }
};

// Legacy exports for backward compatibility
export const loadPTSansFont = loadMontserratFont;
export const loadPTSansBoldFont = loadMontserratBoldFont;
