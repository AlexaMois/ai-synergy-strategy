// Helper to load Roboto font for PDF generation with full Unicode/Cyrillic support
// Using raw GitHub hosted fonts that are guaranteed to work

export const loadMontserratFont = async (): Promise<string | null> => {
  try {
    // Roboto Regular - full character set including Cyrillic from reliable source
    const response = await fetch('https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Regular.ttf');
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

export const loadMontserratBoldFont = async (): Promise<string | null> => {
  try {
    // Roboto Bold - full character set including Cyrillic
    const response = await fetch('https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Bold.ttf');
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

// Legacy exports for backward compatibility
export const loadPTSansFont = loadMontserratFont;
export const loadPTSansBoldFont = loadMontserratBoldFont;
