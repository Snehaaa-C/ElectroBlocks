import type {
  SyncComponent,
  ResetComponent,
} from "../../core/virtual-circuit/svg-sync";
import type {
  PositionComponent,
  CreateWire,
  CreateCompenentHook,
} from "../../core/virtual-circuit/svg-create";

import type { Element, Svg } from "@svgdotjs/svg.js";
import { positionComponent } from "../../core/virtual-circuit/svg-position";
import type { LedColorState } from "./state";
import resistorSmallSvg from "../../core/virtual-circuit/commonsvgs/resistors/resistor-small.svg";
import {
  createGroundWire,
  createWire,
  findResistorBreadboardHoleXY,
} from "../../core/virtual-circuit/wire";
import { rgbToHex } from "../../core/blockly/helpers/color.helper";
import type { ARDUINO_PINS } from "../../core/microcontroller/selectBoard";
import { arduinoComponentStateToId } from "../../core/frames/arduino-component-id";
import type { MicroController } from "../../core/microcontroller/microcontroller";

export const createRgbLed: CreateCompenentHook<LedColorState> = (
  state,
  rgbLedEl,
  arduinoEl,
  draw,
  board
) => {
  //todo consider labeling pin in picture

  rgbLedEl.data("picture-type", state.pictureType);
  createResistors(
    arduinoEl,
    draw,
    state,
    arduinoComponentStateToId(state),
    board
  );
  rgbLedEl.findOne("#PIN_RED_TEXT").node.innerHTML = state.redPin;
  rgbLedEl.findOne("#PIN_BLUE_TEXT").node.innerHTML = state.bluePin;
  rgbLedEl.findOne("#PIN_GREEN_TEXT").node.innerHTML = state.greenPin;
};

export const positionRgbLed: PositionComponent<LedColorState> = (
  state,
  rgbLedEl,
  arduinoEl,
  draw,
  board
) => {
  positionComponent(rgbLedEl, arduinoEl, draw, state.redPin, "PIN_RED", board);
};

export const updateRgbLed: SyncComponent = (state: LedColorState, rgbLedEl) => {
  let color = rgbToHex(state.color);
  if (color.toUpperCase() === "#000000") {
    color = "#FFFFFF";
  }
  (rgbLedEl.findOne("#COLOR_LED") as Element).fill(color);
};

export const resetRgbLed: ResetComponent = (rgbLedEl) => {
  if (rgbLedEl.data("picture-type") === "BUILT_IN") {
    (rgbLedEl.findOne("#COLOR_LED circle") as Element).fill("#FFF");
    return;
  }

  (rgbLedEl.findOne("#COLOR_LED") as Element).fill("#FFF");
};

const createResistors = (
  arduino: Svg | Element,
  draw: Svg,
  state: LedColorState,
  componentId: string,
  board: MicroController
) => {
  if (state.pictureType !== "BREADBOARD") {
    return;
  }

  createResistor(arduino, draw, state.greenPin, componentId, board);
  createResistor(arduino, draw, state.bluePin, componentId, board);
  createResistor(arduino, draw, state.redPin, componentId, board);
};

const createResistor = (
  arduino: Svg | Element,
  draw: Svg,
  pin: ARDUINO_PINS,
  componentId: string,
  board
) => {
  const resistorEl = draw.svg(resistorSmallSvg).last();
  resistorEl.data("component-id", componentId);

  const { x, y } = findResistorBreadboardHoleXY(pin, arduino, draw, board);
  resistorEl.cx(x);
  resistorEl.y(y);
};

export const createWiresRgbLed: CreateWire<LedColorState> = (
  state,
  draw,
  rgbLedEl,
  arduino,
  id,
  board
) => {
  createWire(
    rgbLedEl,
    state.bluePin,
    "PIN_BLUE",
    arduino,
    draw,
    "#4c5dbf",
    "blue-pin",
    board
  );

  createWire(
    rgbLedEl,
    state.redPin,
    "PIN_RED",
    arduino,
    draw,
    "#ef401d",
    "red-pin",
    board
  );

  createWire(
    rgbLedEl,
    state.greenPin,
    "PIN_GREEN",
    arduino,
    draw,
    "#4dc16e",
    "green-pin",
    board
  );

  createGroundWire(
    rgbLedEl,
    state.redPin,
    arduino as Svg,
    draw,
    id,
    "right",
    board
  );
};