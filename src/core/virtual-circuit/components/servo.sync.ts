import { SyncComponent, ResetComponent } from "../svg-sync";
import { PositionComponent, CreateWire } from "../svg-create";

import { ServoState } from "../../frames/arduino-components.state";
import { findSvgElement } from "../svg-helpers";
import { Svg, Text, Element } from "@svgdotjs/svg.js";
import { createWire, createGroundWire, createPowerWire } from "../wire";
import { ARDUINO_PINS } from "../../microcontroller/selectBoard";
import { positionComponent } from "../svg-position";
import { addDraggableEvent } from "../component-events.helpers";

export const servoReset: ResetComponent = (servoEl) => {
  setDegrees(servoEl, 0);
  setText(servoEl, 0);
};

export const servoUpdate: SyncComponent = (state: ServoState, servoEl) => {
  setDegrees(servoEl, state.degree);

  setText(servoEl, state.degree);
};

export const servoCreate: PositionComponent<ServoState> = (state, servoEl) => {
  setServoPinText(servoEl, state);
};

export const servoPosition: PositionComponent<ServoState> = (
  state,
  servoEl,
  arduinoEl,
  draw
) => {
  positionComponent(servoEl, arduinoEl, draw, state.pins[0], "PIN_DATA");
};

const setServoPinText = (servoEl: Element, servoState: ServoState) => {
  const servoName = servoEl.findOne("#servo_pin") as Text;
  servoName.node.textContent = servoState.pins[0].toString();
};

const setText = (servoEl: Element, degrees: number) => {
  const degreeText = servoEl.findOne("#degrees") as Text;

  degreeText.node.textContent = `${degrees}˚`;
  degreeText.cx(40);

  servoEl.findOne("title").node.innerHTML = "Servo";
};

const setDegrees = (servoEl: Element, degrees: number) => {
  // TODO FIX DEGREES
  const servoBoundBox = findSvgElement("CenterOfCicle", servoEl).bbox();
  const movingPart = findSvgElement("moving_part", servoEl);
  const currentDegrees = movingPart.transform().rotate;
  movingPart.rotate(-currentDegrees, servoBoundBox.x, servoBoundBox.y);
  movingPart.rotate(-1 * (degrees + 4), servoBoundBox.cx, servoBoundBox.cy);
};

export const createWiresServo: CreateWire<ServoState> = (
  state,
  draw,
  servoEl,
  arduino,
  id
) => {
  const pin = state.pins[0];
  createWire(servoEl, pin, "PIN_DATA", arduino, draw, "#FFA502", "data");

  if ([ARDUINO_PINS.PIN_13, ARDUINO_PINS.PIN_A2].includes(pin)) {
    // GND then POWER
    createGroundWire(servoEl, pin, arduino as Svg, draw, id, "left");

    createPowerWire(servoEl, pin, arduino as Svg, draw, id, "left");
  }

  // POWER THEN GND

  createPowerWire(servoEl, pin, arduino as Svg, draw, id, "left");

  createGroundWire(servoEl, pin, arduino as Svg, draw, id, "left");
};
