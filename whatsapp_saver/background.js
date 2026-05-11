function cleanPhoneNumber(phone) {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('05')) {
    cleaned = '972' + cleaned.substring(1);
  } else if (cleaned.length === 9 && cleaned.startsWith('5')) {
    cleaned = '972' + cleaned;
  }
  return cleaned;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-to-sheet",
    title: "Save to Google Sheets",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-to-sheet" && info.selectionText) {
    const rawPhone = info.selectionText;
    const phone = cleanPhoneNumber(rawPhone);
    const waUrl = `https://wa.me/${phone}`;
    const pageUrl = info.pageUrl;
    
    chrome.storage.sync.get({ webhookUrl: '' }, (items) => {
      const webhookUrl = items.webhookUrl;
      
      if (!webhookUrl) {
        chrome.runtime.openOptionsPage();
        return;
      }

      // Inject script to extract address and price from the DOM
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // Use data attributes as they are more stable than auto-generated classes
          const addressEl = document.querySelector('[data-nagish="description-heading-title"]') || document.querySelector('h1[data-testid="heading"]');
          const address = addressEl ? addressEl.innerText.trim() : "Not found";
          
          const priceEl = document.querySelector('[data-testid="price"]');
          const price = priceEl ? priceEl.innerText.trim() : "Not found";
          
          return { address, price };
        }
      }, (injectionResults) => {
        let address = "Not found";
        let price = "Not found";
        
        if (injectionResults && injectionResults[0] && injectionResults[0].result) {
          address = injectionResults[0].result.address;
          price = injectionResults[0].result.price;
        }

        const payload = {
          url: pageUrl,
          phone: rawPhone,
          whatsappUrl: waUrl,
          address: address,
          price: price
        };

        fetch(webhookUrl, {
          method: 'POST',
          body: JSON.stringify(payload)
        })
        .then(response => {
          console.log("Data sent to Google Sheets successfully.");
          chrome.action.setBadgeText({text: "OK"});
          setTimeout(() => chrome.action.setBadgeText({text: ""}), 2000);
        })
        .catch(error => {
          console.error("Error sending to sheets:", error);
          chrome.action.setBadgeText({text: "ERR"});
          setTimeout(() => chrome.action.setBadgeText({text: ""}), 2000);
        });
      });
    });
  }
});
