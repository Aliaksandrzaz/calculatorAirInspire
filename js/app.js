import {Model} from "./calcModel.js";
import  {Controller} from "./calcContr.js";
import {View} from "./calcView.js";
import {EventEmitter} from "./eventEmitter.js";

let eventEmitter = new EventEmitter();
let model = new Model(eventEmitter);
let controller = new Controller(model);
let view = new View(controller, model, eventEmitter);