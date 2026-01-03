// Helper to load font for PDF generation with Cyrillic support
export const loadPTSansFont = async (): Promise<string | null> => {
  try {
    // Load PT Sans Regular with Cyrillic subset from Google Fonts CDN
    const response = await fetch('https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0-ExcOPIDU.ttf');
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
    console.error('Failed to load PT Sans font:', err);
    return null;
  }
};

export const loadPTSansBoldFont = async (): Promise<string | null> => {
  try {
    // Load PT Sans Bold with Cyrillic subset from Google Fonts CDN
    const response = await fetch('https://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh0OqtLR8a8zI.ttf');
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
    console.error('Failed to load PT Sans Bold font:', err);
    return null;
  }
};
