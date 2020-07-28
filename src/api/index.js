function easyApi() {
  this.http = new XMLHttpRequest();
}

// GET
easyApi.prototype.GET = function (url, callback) {
  this.http.open("GET", url, true);

  let self = this;
  this.http.onload = function () {
    if (self.http.status === 200) {
      callback(null, JSON.parse(self.http.responseText));
    } else {
      callback(`Error: ${self.http.status}`);
    }
  };

  this.http.send();
};

const http = new easyApi();

export default http;

// POST

// UPDATE

// DELETE
