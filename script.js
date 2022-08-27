function shuffle(array) {
	let currentIndex = array.length, randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
	return array;
}

let captions = {
	"rhino": "The Great Indian Rhino at Kaziranga National Park, Assam",
	"forest": "On the way to Duchess Falls, Pachmarhi",
	"birb": "Painted Stork, Keoladeo National Park, Bharatpur",
	"kanheri": "Kanheri Caves, Mumbai",
	"canyon": "Grand Canyon, Arizona, USA",
	"sanchi": "Buddha statue at Sanchi, Madhya Pradesh",
	"antcanyon": "Antelope Canyon, Arizona, USA",
	"guwahati": "Autos, and inside them - Guwahati, Assam",
	"beach": "Long exposure at Versova Beach, Mumbai",
	"oregon": "Papa and Didi at Didi's apartment in Hillsboro, Oregon, USA",
	"triveni": "Triveni Sangam, Allahabad",
	"tree": "Kalsubai, Maharashtra"
}

function getImage(imagePost, width, height) {
	var image = document.createElement('img');
	image.setAttribute("src", imagePost.thumb_src);
	image.setAttribute("data-full-size-src", imagePost.full_src);
	image.setAttribute("alt", imagePost.caption);
	image.setAttribute("width", width);
	// image.setAttribute("height", height);

	let className = "thumb-img-" + imagePost.id;
	image.classList.add(className);

	return image;
}

function getImageLarge(imagePost) {
	var image = getImage(imagePost, 600);
	// todo clean this shit
	image.setAttribute("src", image.getAttribute("data-full-size-src"));
	return image;
}

function getImageThumbnail(imagePost) {
	return getImage(imagePost, 149);
}

function getTextPostThumbnail(textPost) {
	var textPost = document.createElement('p');
	textPost.innerHTML = "hello world!";
	return textPost;
}

function wrapWithDiv(post) {
	var wrapper = document.createElement('div');
	wrapper.appendChild(post);
	return wrapper;
}

function renderThumbnails(posts) {
	var thumbsDiv = document.querySelector('.thumbs');

	posts.forEach((post) => {
		// all posts are images for now
		thumbsDiv.appendChild(wrapWithDiv(getImageThumbnail(post)));
	});
}

function renderFocus(post) {
	var currentFocusDiv = document.querySelector('.current-focus');
	// all posts are images for now
	currentFocusDiv.appendChild(getImageLarge(post));
}

function attachEventListeners(event) {
	var thumbsDiv = document.querySelector('.thumbs');
	var thumbImages = thumbsDiv.children;
	for (var i = 0; i < thumbImages.length; i++) {
		var thumbImageDiv = thumbImages.item(i);
		thumbImageDiv.onclick = function (event) {
			var thumbImage = event.target;

			var focusDiv = document.querySelector('.current-focus');
			var focusImage = focusDiv.children.item(0);

			focusImage.setAttribute('alt', thumbImage.getAttribute('alt'));
			focusImage.setAttribute('src', '');
			focusImage.setAttribute('src', thumbImage.getAttribute('data-full-size-src'));

			focusDiv.classList.forEach((x, i) => {
				if (x === "current-focus") return;
				focusDiv.classList.remove(x);
			})

		}
	}
}


var imagePosts = [];
for (const [postId, caption] of Object.entries(captions)) {
	var image = {};
	image['id'] = postId;
	image['thumb_src'] = "photos/" + postId + "_thumb.jpeg";
	image['full_src'] = "photos/" + postId + ".jpeg";
	image['caption'] = caption;
	// console.log('created new image post object from image id = ', postId, 'image = ', post);
	imagePosts.push(image);
}

imagePosts = shuffle(imagePosts);
renderFocus(imagePosts[0]);
renderThumbnails(imagePosts);
attachEventListeners();



// gtag
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-238737936-1');