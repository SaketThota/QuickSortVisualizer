var w = window.innerWidth,
	h = window.innerHeight,
	toolsHeight = document.querySelector('.tools').offsetHeight,
	n = 0,
	a = [],
	flag = [],
	cur,
	it1 = -1,
	it2 = -1;

// 300,200,400,100
const genBtn = document.querySelector('#genArr');

function setup() {
	let canvas = createCanvas(w, h - toolsHeight);
	canvas.style('display', 'block');

	var stringArray;
	let visQuickSort = document.querySelector('#visualBtn');

	visQuickSort.addEventListener('click', function checker() {
		n = parseInt(document.querySelector('#customSzIpt').value);

		if (n) {
			a = [];
			stringArray = document.querySelector('#customEleIpt').value;
			stringArray += ',';
			let num = '';

			for (let i = 0; i < stringArray.length; ++i) {
				let ch = stringArray[i];

				if (ch != ',') num += ch;
				else {
					a.push(parseInt(num));
					num = '';
				}
			}

			if (n < a.length) {
				alert('Number of Elements exceeded..!');
			} else if (n > a.length) {
				alert('We need more elements...!');
			} else {
				genBtn.disabled = true;
				flag = new Array(a.length);
				flag.fill(0);
				quickSort(a, 0, a.length - 1);
			}
		}
	});
}

/*Random*/
let mark = 0;
function clicked() {
	mark ^= 1;
	let allow = document.querySelector('#randomSzIpt');

	if (mark) allow.disabled = false;
	else allow.disabled = true;
}

function generate() {
	let rdSize = document.querySelector('#randomSzIpt').value;
	a = [];

	if (!mark) n = Math.round(random(10, 50));
	else n = parseInt(rdSize);

	for (let i = 0; i < n; ++i) a.push(i);

	for (let i = 0; i < a.length; ++i) a[i] = Math.round(random(100, 500));

	console.log(a);
	flag = new Array(a.length);
	flag.fill(0);
}

async function quickSort(arr, low, high) {
	if (low < high) {
		let idx = await partition(arr, low, high);

		Promise.all([ quickSort(arr, low, idx - 1), quickSort(arr, idx + 1, high) ]);
	}

	if (isSorted(a)) flag.fill(2);
}

async function partition(arr, low, high) {
	let pivot = arr[high];
	let i = low - 1;
	cur = high;

	for (let j = low; j < high; ++j) {
		if (arr[j] <= pivot) {
			++i;
			await swap(arr, i, j);
		}
		(it1 = i), (it2 = j);
	}
	await swap(arr, i + 1, high);

	return i + 1;
}

async function swap(arr, i, j) {
	await sleep(50);
	[ arr[i], arr[j] ] = [ arr[j], arr[i] ];
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function isSorted(arr) {
	let temp = true;
	for (let i = 1; i < arr.length; ++i) {
		if (arr[i - 1] > arr[i]) {
			temp = false;
			break;
		}
	}
	return temp;
}

const shuffleBtn = document.querySelector('#shuffleBtn');
shuffleBtn.addEventListener('click', () => {
	let temp = [],
		val,
		length = a.length;

	while (temp.length < length) {
		let idx = Math.round(random(0, a.length - 1));
		val = a[idx];
		a.splice(idx, 1);
		temp.push(val);
	}

	if (isSorted(temp)) {
		let idx1 = Math.round(random(0, a.length / 2)),
			idx2 = Math.round(random((a.length + 1) / 2, a.length + 1));

		[ temp[idx1], temp[idx2] ] = [ temp[idx2], temp[idx1] ];
	}

	a = temp;
	flag.fill(0);
});

function draw() {
	background('#434343');
	textAlign(CENTER);

	if (a.length > 0) {
		if (count(flag) != flag.length) {
			flag[cur] = 1;
			if (it1 >= 0) flag[it1] = flag[it2] = 3;
		}

		let hRatio = Math.round(w / a.length),
			x = 0;
		let mul = w % a.length;
		mul /= a.length;
		hRatio += mul;

		for (let i = 0; i < a.length; ++i) {
			if (flag[i] == 3) fill('#17a2b8');
			else if (flag[i] == 2) fill('#28a745');
			else if (flag[i] == 1) fill('#dc3545');
			else fill(255);

			rect(x, h - a[i] - toolsHeight, hRatio, a[i]);
			x += hRatio;
		}

		if (count(flag) != flag.length) {
			flag[cur] = 0;
			if (it1 >= 0) flag[it1] = flag[it2] = 0;
		}
	}
}

function assginDisable() {
	let tempN = document.querySelector('#customSzIpt').value;
	tempN = parseInt(tempN);

	if (tempN) {
		let tempA = [];

		let tempstring = document.querySelector('#customEleIpt').value;
		tempstring += ',';
		let num = '';

		for (let i = 0; i < tempstring.length; ++i) {
			let ch = tempstring[i];

			if (ch != ',') num += ch;
			else {
				tempA.push(parseInt(num));
				num = '';
			}
		}

		if (tempA.length == tempN) genBtn.disabled = true;
		else genBtn.disabled = false;
	}
}

function count(arr) {
	let cnt = 0;

	for (let i = 0; i < arr.length; ++i) {
		cnt += arr[i] == 2;
	}

	console.log(cnt);
	return cnt;
}

function windowResized() {
	w = window.innerWidth;
	h = window.innerHeight;
	resizeCanvas(w, h);
}
