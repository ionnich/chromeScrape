document.addEventListener('DOMContentLoaded', function() {
    var downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
      chrome.tabs.query({ currentWindow: true }, function(tabs) {
        var urls = [];
        tabs.forEach(function(tab) {
          urls.push(tab.url);
        });
  
        var blob = new Blob([urls.join('\n')], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
  
        var filename = 'tab_urls.txt';
        chrome.downloads.download({
          url: url,
          filename: filename
        });
      });
    });
  
    var downloadCampaignButton = document.getElementById('downloadCampaignButton');
    downloadCampaignButton.addEventListener('click', function() {
      var name = document.getElementById('name').value;
      if (!name) {
        alert('Please enter your name!');
        return;
      }
  
      chrome.tabs.query({ currentWindow: true }, function(tabs) {
        var campaignNames = [];
        tabs.forEach(function(tab) {
          var match = tab.url.match(/\/([a-z-]+)\/?$/);
          if (match) {
            var campaignName = match[1] + '-' + name + '-' + getShortDate();
            campaignNames.push(campaignName);
          }
        });
  
        if (campaignNames.length > 0) {
          var blob = new Blob([campaignNames.join('\n')], { type: 'text/plain' });
          var url = URL.createObjectURL(blob);
  
          var filename = 'campaign_names.txt';
          chrome.downloads.download({
            url: url,
            filename: filename
          });
        } else {
          alert('No dashed words found in URLs!');
        }
      });
    });
  
    function getShortDate() {
      var date = new Date();
      var month = date.toLocaleString('default', { month: 'short' });
      var day = date.getDate().toString().padStart(2, '0');
      return month + day;
    }
  });
  