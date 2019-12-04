/**
 *
 * Misc functions
 * 
 * @link   nbrosowsky.github.io
 * @author Nicholaus P. Brosowsky <nbrosowsky@gmail.com>
 * @since  2018-05-20
 *
 */


var g = function () {
    //detects which browser the user is using and stores in var Browserinfo//
    var BrowserDetect = {
            init: function () {
                this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
                this.version = this.searchVersion(navigator.userAgent) ||
                    this.searchVersion(navigator.appVersion) ||
                    "an unknown version";
                this.OS = this.searchString(this.dataOS) || "an unknown OS";
            },
            searchString: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var dataString = data[i].string;
                    var dataProp = data[i].prop;
                    this.versionSearchString = data[i].versionSearch || data[i].identity;
                    if (dataString) {
                        if (dataString.indexOf(data[i].subString) != -1)
                            return data[i].identity;
                    } else if (dataProp)
                        return data[i].identity;
                }
            },
            searchVersion: function (dataString) {
                var index = dataString.indexOf(this.versionSearchString);
                if (index == -1) return;
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            },
            dataBrowser: [
           {
                string: navigator.userAgent,
                subString: "Edge",
                identity: "Edge"
            },
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {
                string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            { // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            { // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }],
        dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
    }, {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
    }, {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
    }, {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
    }]

};
BrowserDetect.init();

var BrowserInfo = [];
BrowserInfo[0] = BrowserDetect.browser;
BrowserInfo[1] = BrowserDetect.version;
BrowserInfo[2] = BrowserDetect.OS;


/* Disable the backspace key / can add other keys if necessary */
var disableBS = function () {
    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function (e) {
        if (e.which == 8) { // 8 == backspace
            if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
                e.preventDefault();
            }
        }
    });
};



/* compute average of array */
function calcAVG(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var avg = total / array.length;
    return (avg);
}

/* shuffle an array */
function shuffle(array) {
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

    return array;
}


// function to get radio response
// returns "no response" if nothing is checked
// checks for an "other" option and adds the other text 
function getRadio(x) {
    var response = "no response"
    // if a response exists...
    if ($("[name='" + x + "']:checked").val()) {

        // check to see if it is other.. if so, grab the other text input
        if ($("[name='" + x + "']:checked").val() == "Other") {
            var temp = $("#" + x + "-other").val() ? $("#" + x + "-other").val() : "no response"
            response = "other: " + temp
        } else {
            response = $("[name='" + x + "']:checked").val()
        }

    }

    return response

};

function clearRadio(x) {
    // clear the previous radio selections
    document.querySelectorAll('input[name=' + x + ']').forEach(function (x) {
        x.checked = false
    })
};

function validateResponse(x) {
    var t;
    (Object.prototype.toString.call(x) === '[object Array]') ? t = x: t = [].concat(x);


    for (i = 0; i <= t.length - 1; i++) {
        if (document.getElementsByName(t[i]).length > 0) {
            if (document.getElementsByName(t[i])[0].type == "radio") {
                if (getRadio(t[i]) === "no response" || getRadio(t[i]) === "other: no response") {
                    return false
                }
            } else if (document.getElementsByName(t[i])[0].type == "text" || document.getElementsByName(t[i])[0].type == "textarea") {
                if ($("[name=" + t[i] + "]").val() === "") {
                    return false
                }

            }
        }


    }

    return true

};

/*
Copyright (c) 2011 Andrei Mackenzie
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Compute the edit distance between the two given strings
function editDist(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};


return {
    BrowserInfo: BrowserInfo,
    disableBS: disableBS,
    calcAVG: calcAVG,
    shuffle: shuffle,
    getRadio: getRadio,
    clearRadio: clearRadio,
    validateResponse: validateResponse,
    editDist: editDist
}

}()
