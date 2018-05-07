import Application from './application';

const app = new Application(window.innerWidth, window.innerHeight);
document.body.appendChild(app.renderer.domElement);
app.run();
