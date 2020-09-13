import { SyncComponent, ResetComponent } from "../svg-sync";
import { PositionComponent, CreateWire } from "../svg-create";

import { LedMatrixState } from "../../frames/arduino-components.state";
import { Element, Svg } from "@svgdotjs/svg.js";

import { positionComponent } from "../svg-position";
import { ARDUINO_PINS } from "../../microcontroller/selectBoard";
import { createPowerWire, createGroundWire, createWire } from "../wire";

export const ledMatrixPosition: PositionComponent<LedMatrixState> = (
  _,
  ledMatrixEl,
  arduinoEl,
  draw
) => {
  arduinoEl.y(draw.viewbox().y2 - arduinoEl.height() + 100);

  positionComponent(
    ledMatrixEl,
    arduinoEl,
    draw,
    ARDUINO_PINS.PIN_10,
    "PIN_DATA"
  );
};

export const ledMatrixUpdate: SyncComponent = (
  state: LedMatrixState,
  ledMatrixEl
) => {
  state.leds.forEach((led) => {
    (ledMatrixEl.findOne(`#_${led.col}-${led.row} circle`) as Element).fill(
      led.isOn ? "#FF0000" : "#FFF"
    );
  });
};

export const ledMatrixReset: ResetComponent = (componentEl: Element) => {
  for (let row = 1; row <= 8; row += 1) {
    for (let col = 1; col <= 8; col += 1) {
      (componentEl.findOne(`#_${col}-${row} circle`) as Element).fill("#FFF");
    }
  }
};

export const createWiresLedMatrix: CreateWire<LedMatrixState> = (
  state,
  draw,
  ledMatrixEl,
  arduino,
  id
) => {
  createPowerWire(
    ledMatrixEl,
    ARDUINO_PINS.PIN_9,
    arduino as Svg,
    draw,
    id,
    "left"
  );

  createGroundWire(
    ledMatrixEl,
    ARDUINO_PINS.PIN_9,
    arduino as Svg,
    draw,
    id,
    "left"
  );

  createWire(
    ledMatrixEl,
    ARDUINO_PINS.PIN_12,
    "PIN_DATA",
    arduino,
    draw,
    "#027a18",
    "data-pin"
  );
  createWire(
    ledMatrixEl,
    ARDUINO_PINS.PIN_10,
    "PIN_CS",
    arduino,
    draw,
    "#7b5fc9",
    "cs-pin"
  );
  createWire(
    ledMatrixEl,
    ARDUINO_PINS.PIN_11,
    "PIN_CLK",
    arduino,
    draw,
    "#2130ff",
    "clk-pin"
  );
};
