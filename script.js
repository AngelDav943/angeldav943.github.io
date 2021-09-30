const input = document.getElementById('MInput')
const output = document.getElementById('MOutput')

function getData(api_point) {
    return new Promise(function(resolve, reject) {
        fetch("https://angeldc943.repl.co/api/"+api_point).then(res => {
            res.json().then(data => {
                resolve(data)
            })
        })
    })
}

function hamming_distance(string1, string2) {
	var dist_counter = 0
    for (let n = 0; n < string1.length; n++) {
        if (string1[n] != string2[n]) 
            dist_counter += 1
    }
    //console.log(string2.substring(string1.length))

	return dist_counter
}

function BasicInfo() {
    getData("forum/get").then(data => {
        var total_posts = 0;
        for (let i = 0; i < data.length; i++) {
            const topic = data[i];
            total_posts += topic.posts.length;
        }

        console.log(data)

        document.getElementById('ForumInfo').innerHTML = `${data.length} topics; ${total_posts} posts`;
    })
}

BasicInfo()

var search = {
    find: function(suggestion) {
        output.innerHTML = `Searching ${input.value}..`
        
        getData("users/get").then(data => {
            document.getElementById('ForumOuput').innerHTML += `<p>${input.value}</p>`
            output.innerHTML = "";
            input.value = "";
        })
    },
    suggestion: function() {
        var suggestion = document.getElementById('MSuggest')
        getData("users/get").then(userdata => {
            var data = [];
            userdata.forEach(user => {
                data.push(user.name);
            })
            
            var returntopic;
            var def = input.value.length*10;
            var user_element = data.findIndex( (element) => element.toLowerCase() == input.value.toLowerCase());

            if (user_element != -1) returntopic = data[user_element]

            if (!returntopic) for (let d = 0; d < data.length; d++) {
                const user = data[d];
                const dist = hamming_distance(user.toLowerCase(),input.value.toLowerCase());
                //console.log(def)
                if (dist < user.length && dist <= def) {
                    def--;
                    returntopic = user
                }
            }

            if (!returntopic) return undefined

            return {
                "name":returntopic,
                "hdist":hamming_distance(returntopic,input.value),
                "def":def
            };

        }).then(topic => {
            var s = ""
            if (topic && topic.name) s = `You meant <a onclick="document.getElementById('MInput').value = '${topic.name}'">${topic.name}</a>? hm: ${topic.hdist} || def: ${topic.def}`
            
            suggestion.innerHTML = s
        })
    }
}