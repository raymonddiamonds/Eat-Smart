#README for SMEART

To Start the app:
ensure you have MongoDB and Node Package Manager installed on your OS (and added to the PATH if you are on Windows).
pull the github repo and install the dependencies by going into 'backend' and 'my-app' folders respectively and
typing 'npm install' in the command prompt.
to start the app in the backend:
	-in the folder backend, (in your command prompt), type in 'mongod --dbpath db'.
	-next, type in 'npm start'
to start the front end
	-go to the folder 'my-app' and type in 'npm start' in the command prompt
the app should be running now.
type in 'http://localhost:3000/' in your browser.
Now create a username and password (signup) and start using the app (choosing one of the features).



# Eat Smart

Eat Smart is designed to give you the ability to solve one of mankind's greatest problems: eating. We often find ourselves deciding to choose between making food at home or eating food at a restaurant. Eat Smart will intelligently find recipes using ingredients you already have in the fridge. It can also find nearby restaurants using a specific budget in mind. Whether you choose to Eat In or Eat Out, Eat Smart will help you every step of the way so that food appears in front of you. Bon appetite!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Ensure MongoDB and NPM is already installed. In terminal, navigate to ./backend/my-app/ directory where the package.json lives. 

```
npm install 
```

## Running 

To start the backend:

Navigate to ./backend/my-app/
```
mongod --dbpath db
```

```
npm start
```

To start the client-side:

Navigate to ./my-app/:
```
npm start
```

The app will be hosted locally at: ```http://localhost:3000/```

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing



## Versioning



## Authors


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments






