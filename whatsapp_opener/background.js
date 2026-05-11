chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-whatsapp",
    title: "Open in WhatsApp",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-whatsapp" && info.selectionText) {
    let phone = info.selectionText.replace(/\D/g, ''); // Remove non-digits
    
    // Israeli number logic (most likely use case based on 'yad2')
    // 05X-XXXXXXX -> 9725XXXXXXXX
    if (phone.length === 10 && phone.startsWith('05')) {
      phone = '972' + phone.substring(1);
    } 
    // If it's 9 digits and starts with 5 (e.g. they selected 5X-XXXXXXX)
    else if (phone.length === 9 && phone.startsWith('5')) {
      phone = '972' + phone;
    }
    
    // Open WhatsApp Web
    const url = `https://wa.me/${phone}`;
    chrome.tabs.create({ url: url });
  }
});
