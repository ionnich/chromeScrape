chrome.tabs.query({ currentWindow: true }, function(tabs) {
    var urls = [];
    tabs.forEach(function(tab) {
      urls.push(tab.url);
    });
  
    var blob = new Blob([urls.join('\n')], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
  
    var filename = 'urls.txt';
    chrome.downloads.download({
      url: url,
      filename: filename
    });
  });
  