const input = document.getElementById('MInput')
const output = {
    element: document.getElementById('OutputList'),
    contents:[],
    print: function(text, offset) {
        text = `<p>${text}</p>`;
        var result = this.element.innerHTML + text;
        if (offset == 1) result = text + this.element.innerHTML;

        this.element.innerHTML = result;
        this.element.scrollTop = this.element.scrollHeight;
        
        if (offset == 1) {
            this.contents.unshift(text);
        } else {
            this.contents.push(text);
        }
    },
    clear: function(amount = 0) {
        if (amount > 0) {
            var removednumber = this.element.innerHTML.length;
            
            for (let i = this.contents.length; i > this.contents.length-amount; i--) {
                if (this.contents[i-1]) removednumber -= this.contents[i-1].length;
            }
            this.contents.splice(this.contents.length-amount, this.contents.length)

            this.element.innerHTML = this.element.innerHTML.substring(0, removednumber);
        }
        else {
            this.element.innerHTML = ""
        }
    },
    set: function(list, disableScroll) {
        if (typeof(list) != "object") return;

        this.element.innerHTML = "<p>"+list.join("</p><p>")+"</p>";
        if (!disableScroll) this.element.scrollTop = this.element.scrollHeight;
        this.contents = list;
    }
}

function char_distance(string, targetstring) {
    var dist_counter = 0
    string = String(string).toLowerCase();
    targetstring = String(targetstring).toLowerCase();
    
    for (let n = 0; n < targetstring.length; n++) {
        if (targetstring[n] != string[n] && string[n] != undefined) 
        dist_counter += 1
    }
    return dist_counter
}

var data = [ // Test data
    "Andec",
    "Computer",
    "Forum",
    "Blog",
    "Website",
    "Server",
    "Data",
    "Stuff",
    "Internet",
    "Cones",
    "Post",
    "Archive",
    "Date",
    "Sector A",
    "Sector B",
    "Test Chamber A5"
]

fetch("https://angeldc943.repl.co/api/users/get?value=name").then(res => {
    return res.json();
}).then(users => {
    data = [...data, ...users]
    suggestion();
})

function suggestion() {
    var suggestionlist = [];
    var distlist = []
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        var dist = char_distance(input.value, element);
        suggestionlist.push(element);
        distlist.push(element + "; dist:" + dist);
    }

    distlist.sort((element_a, element_b) => {
        const a = element_a.split("; dist:")[1];
        const b = element_b.split("; dist:")[1];
        return a-b;
    })
    
    for (let index = 0; index < distlist.length; index++) {
        distlist[index] = distlist[index].split("; dist:")[0];
    }

    output.set(distlist, true);
}

/*fetch('./data.json').then(res => res.json()).then(data => {
    suggestion = function() {
        console.log(data)
    }
});*/