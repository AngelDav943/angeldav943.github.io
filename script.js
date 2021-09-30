const input = document.getElementById('MInput')
const output = document.getElementById('MOutput')

var last_fetch;
function getForumData() {
    return new Promise(function(resolve, reject) {
        if (!last_fetch) {
            fetch("https://angeldc943.repl.co/api/forum/get").then(res => {
                res.json().then(data => {
                    last_fetch = data;
                    resolve(data)
                })
            })
        } else {
            resolve(last_fetch)
        }
    })
}

function hamming_distance(string1, string2) {
	var dist_counter = 0
    for (let n = 0; n < string1.length; n++) {
        if (string1[n] != string2[n]) dist_counter += 1
    }
	return dist_counter
}

function forumBasicInfo() {
    getForumData().then(data => {
        var total_posts = 0;
        for (let i = 0; i < data.length; i++) {
            const topic = data[i];
            total_posts += topic.posts.length;
        }

        console.log(data)

        document.getElementById('ForumInfo').innerHTML = `${data.length} topics; ${total_posts} posts`;
    })
}

forumBasicInfo()

var search = {
    post: function() {
        output.innerHTML = "searching post..."
        
        setTimeout(function() {
            output.innerHTML = "Error finding post."
            input.value = ""
        },2000)
    },
    topic: function(suggestion) {
        output.innerHTML = `Searching topic ${input.value}..`
        
        getForumData().then(data => {
            document.getElementById('ForumOuput').innerHTML += `<p>${input.value}</p>`
            output.innerHTML = "";
            input.value = "";
        })
    },
    suggestion: function() {
        var suggestion = document.getElementById('MSuggest')
        getForumData().then(forumdata => {
            var data = [];
            forumdata.forEach(topic => {
                data.push(topic.name);
                topic.posts.forEach(post => {
                    data.push(`${topic.name} ${post.index+1}`);
                });
            })
            
            var returntopic;
            var def = 5;

            for (let i = 0; i < 1; i++) {
                for (let d = 0; d < data.length; d++) {
                    const topic = data[d];
                    if (hamming_distance(topic,input.value) <= def) {
                        def--;
                        returntopic = topic
                        if (topic == input.value) break;
                    }
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