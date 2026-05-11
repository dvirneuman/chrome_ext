const saveOptions = () => {
  const url = document.getElementById('webhookUrl').value;
  chrome.storage.sync.set(
    { webhookUrl: url },
    () => {
      const status = document.getElementById('status');
      status.textContent = 'Settings saved successfully!';
      setTimeout(() => {
        status.textContent = '';
      }, 3000);
    }
  );
};

const restoreOptions = () => {
  chrome.storage.sync.get(
    { webhookUrl: '' },
    (items) => {
      document.getElementById('webhookUrl').value = items.webhookUrl;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
