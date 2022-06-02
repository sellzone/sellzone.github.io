class Chatbox {
	constructor() {
		this.args = {
			openButton: document.querySelector('.chatbox__button'),
			chatBox: document.querySelector('.chatbox__support'),
			sendButton: document.querySelector('.send__button')
		}

		this.state = false;
		this.messages = [];
	}

	display() {
		const {
			openButton,
			chatBox,
			sendButton
		} = this.args;

		openButton.addEventListener('click', () => this.toggleState(chatBox))

		sendButton.addEventListener('click', () => this.onSendButton(chatBox))

		const node = chatBox.querySelector('input');
		node.addEventListener("keyup", ({
			key
		}) => {
			if (key === "Enter") {
				this.onSendButton(chatBox)
			}
		})
	}

	toggleState(chatbox) {
		this.state = !this.state;

		// show or hides the box
		if (this.state) {
			chatbox.classList.add('chatbox--active')
		} else {
			chatbox.classList.remove('chatbox--active')
		}
	}

	onSendButton(chatbox) {
		var textField = chatbox.querySelector('input');
		let text1 = textField.value
		if (text1 === "") {
			return;
		}

		let msg1 = {
			name: "User",
			message: text1
		}
		this.messages.push(msg1);
		this.updateChatText(chatbox);
		textField.value = ''

		// Retrieve user data from local storage
		let data = localStorage.getItem('user_data');
		data = data ? JSON.parse(data) : {'uuid': uuidv4()};

		fetch('https://chatbot.sellz.one/predict', {
				method: 'POST',
				body: JSON.stringify({
					sentence: text1,
					user_data: data
				}),
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(r => r.json())
			.then(r => {
				r.answer.forEach((answer) => {
					let msg = {
						name: "Sam",
						message: answer
					};
					this.messages.push(msg);
					this.updateChatText(chatbox)
				});

				// Save user data
				localStorage.setItem('user_data', JSON.stringify(r.user_data));
				// Display user data
				data = JSON.parse(localStorage.getItem('user_data'));
				document.getElementById("user_data").innerHTML = dumpUserData(data);

			}).catch((error) => {
				console.error('Error:', error);
				this.updateChatText(chatbox)
				textField.value = ''
			});
	}

	updateChatText(chatbox) {
		var html = '';
		this.messages.slice().reverse().forEach(function (item, index) {
			if (item.name === "Sam") {
				html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
			} else {
				html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
			}
		});

		const chatmessage = chatbox.querySelector('.chatbox__messages');
		chatmessage.innerHTML = html;
	}
}

function dumpUserData(data) {
	let html = '';
	for (const [key, value] of Object.entries(data)) {
		if (value === null) continue;
		if (typeof value === 'object') {
			html += `<div>
				${key}: ${dumpUserData(value)}
			</div>`
		} else {
			html += `<div>${key}: ${value}</div>`;
		}
	}
	return html;
}


const chatbox = new Chatbox();
chatbox.display();