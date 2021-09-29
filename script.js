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

var suggest

var search = {
    post: function() {
        output.innerHTML = "searching post..."
        
        setTimeout(function() {
            output.innerHTML = "Error finding post."
            input.value = ""
        },2000)
    },
    topic: function(suggestion) {
        output.innerHTML = "searching topic.."
        
        getForumData().then(data => {
            
            var returntopic = suggest;
            var def = 5;

            return returntopic;
        }).then(topicname => {
            document.getElementById('ForumOuput').innerHTML += `<p>${topicname}</p>`
            output.innerHTML = `Did you mean ${topicname}?`
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
                    data.push(`${topic.name} ${post.index}`);
                });
            })
            
            var returntopic;
            var def = 5;
            
            if (data[input.value]) returntopic = data[input.value]
            console.log(data[input.value])

            if (!returntopic) for (let i = 0; i < 1; i++) {
                data.forEach(topic => {
                    if (hamming_distance(topic,input.value) <= def) {
                        def--;
                        returntopic = topic
                    }
                });
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
            
            suggest = topic.name
            suggestion.innerHTML = s
        })
    }
}