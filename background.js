chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    localStorage.setItem("dynamic", '0');
    
    var password = prompt("Please set your password. Don't forget it!", "");

    if (password === "") {
      alert('Enter a valid password. Closing the browser.');
      closeAllWindows();
    } else {
      localStorage.setItem("newPass", password);
      alert('Password saved. Closing the browser.');
      closeAllWindows();
    }
  }
});

chrome.runtime.onStartup.addListener(function () {
  window.open("about:blank");
  var enteredPassword = prompt("Please enter your password", "");
  var storedPassword = localStorage.getItem("newPass");

  if (storedPassword === null) {
    var newPassword = prompt("Please set your password for the first time", "");
    localStorage.setItem("newPass", newPassword);
    alert('Password saved. Closing the browser.');
    closeAllWindows();
  } else {
    if (enteredPassword === storedPassword) {
      chrome.tabs.getAllInWindow(function (tabs) {
        tabs.forEach(function (tab) {
          if (tab.url === "about:blank") {
            chrome.tabs.remove(tab.id);
          }
        });
      });
    } else {
      closeAllWindows();
    }
  }
});

function closeAllWindows() {
  chrome.windows.getAll({}, function (windows) {
    windows.forEach(function (window) {
      chrome.windows.remove(window.id);
    });
  });
}
