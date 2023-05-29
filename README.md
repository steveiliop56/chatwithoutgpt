## ChatWithoutGpt

This is a very simple *chatgpt* like client but instead of using an AI model it uses **humans** so as to be able to make your friend think that they use an actuall AI model but instead just using a prank interface.

### Installation

Firstly clone the repository and install the requirements using these commands:

```sh
git clone https://github.com/steveiliop56/chatwithoutgpt
cd chatwithoutgpt/
pip3 install -r requirements.txt
```

### Running

To run the project run this command:

```sh
python3 manage.py runserver 0.0.0.0:8080
```

Now the app will be available on port 8080 ready for requests. When someone asks it something you will be prompted in the terminal to answer. Each user will have a special session id storred in a cookie.
