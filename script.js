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

function createImagesArr(captions) {
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
	return imagePosts;
}


async function main() {
	console.log("main::invoked!")
	const photosMeta = await fetchPhotosMetadata();
	imagePosts = createImagesArr(photosMeta)
	imagePosts = shuffle(imagePosts);
	renderFocus(imagePosts[0]);
	renderThumbnails(imagePosts);
	attachEventListeners();
}


async function fetchPhotosMetadata() {
	return fetch("/photos_meta.json")
		.then((response) => response.json())
		.then((responseJson) => {return responseJson});
}

main();
