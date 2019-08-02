// import "./style/main.css"
import {Model} from "./js/calcModel.js";
import  {Controller} from "./js/calcContr.js";
import {View} from "./js/calcView.js";
import {EventEmitter} from "./js/eventEmitter.js";

let eventEmitter = new EventEmitter();
let model = new Model(eventEmitter);
let controller = new Controller(model);
let view = new View(controller, model, eventEmitter);