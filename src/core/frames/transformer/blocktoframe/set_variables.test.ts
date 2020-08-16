import 'jest';
import '../../../blockly/blocks';
import '../../../../tests/fake-block';
import {
  createArduinoAndWorkSpace,
  verifyVariable,
  createSetVariableBlockWithValue,
} from '../../../../tests/tests.helper';
import Blockly, { Workspace, BlockSvg } from 'blockly';
import { VariableTypes } from '../../../blockly/dto/variable.type';
import {
  connectToArduinoBlock,
  getAllBlocks,
} from '../../../blockly/helpers/block.helper';
import { BlockEvent } from '../../../blockly/dto/event.type';
import { getAllVariables } from '../../../blockly/helpers/variable.helper';
import { transformBlock } from '../../../blockly/transformers/block.transformer';
import { transformVariable } from '../../../blockly/transformers/variables.transformer';
import { eventToFrameFactory } from '../../event-to-frame.factory';
import _ from 'lodash';

describe('test variables factories', () => {
  let workspace: Workspace;
  let arduinoBlock: BlockSvg;

  afterEach(() => {
    workspace.dispose();
  });

  beforeEach(() => {
    [workspace, arduinoBlock] = createArduinoAndWorkSpace();
  });

  test('a number variable should be able to change', () => {
    arduinoBlock.setFieldValue('1', 'LOOP_TIMES');
    const setNumberBlock1 = createSetVariableBlockWithValue(
      workspace,
      'num_var',
      VariableTypes.NUMBER,
      30
    );

    const setNumberBlock2 = createSetVariableBlockWithValue(
      workspace,
      'num_var',
      VariableTypes.NUMBER,
      50
    );
    connectToArduinoBlock(setNumberBlock2);
    connectToArduinoBlock(setNumberBlock1);

    const event: BlockEvent = {
      blocks: getAllBlocks().map(transformBlock),
      variables: getAllVariables().map(transformVariable),
      type: Blockly.Events.BLOCK_MOVE,
      blockId: setNumberBlock2.id,
    };
    const states = eventToFrameFactory(event);
    expect(states.length).toEqual(2);

    const [state1, state2] = states;
    expect(state1.variables['num_var'].value).toBe(30);
    expect(state2.variables['num_var'].value).toBe(50);
  });

  test('all the set variables blocks should work', () => {
    arduinoBlock.setFieldValue('1', 'LOOP_TIMES');
    const setNumberBlock = createSetVariableBlockWithValue(
      workspace,
      'num_var',
      VariableTypes.NUMBER,
      30
    );
    connectToArduinoBlock(setNumberBlock);
    const setStringBlock = createSetVariableBlockWithValue(
      workspace,
      'string_var',
      VariableTypes.STRING,
      'test'
    );
    connectToArduinoBlock(setStringBlock);

    const setBooleanBlock = createSetVariableBlockWithValue(
      workspace,
      'bool_var',
      VariableTypes.BOOLEAN,
      true
    );
    connectToArduinoBlock(setBooleanBlock);

    const setColorBlock = createSetVariableBlockWithValue(
      workspace,
      'color_var',
      VariableTypes.COLOUR,
      { red: 170, green: 0, blue: 170 }
    );
    connectToArduinoBlock(setColorBlock);

    const event: BlockEvent = {
      blocks: getAllBlocks().map(transformBlock),
      variables: getAllVariables().map(transformVariable),
      type: Blockly.Events.BLOCK_MOVE,
      blockId: setColorBlock.id,
    };
    const states = eventToFrameFactory(event);
    expect(states.length).toEqual(4);

    const [state1, state2, state3, state4] = states;
    const actualExplanation = states.map((s) => s.explanation).sort();
    const expectedExplanations = [
      'Variable "num_var" stores 30.',
      'Variable "string_var" stores "test".',
      'Variable "bool_var" stores true.',
      'Variable "color_var" stores (red=170,green=0,blue=170).',
    ].sort();
    expect(actualExplanation).toEqual(expectedExplanations);
    expect(_.keys(state1.variables).length).toBe(1);
    expect(_.keys(state2.variables).length).toBe(2);
    expect(_.keys(state3.variables).length).toBe(3);
    expect(_.keys(state4.variables).length).toBe(4);

    verifyVariable('num_var', VariableTypes.NUMBER, 30, state4.variables);
    verifyVariable(
      'string_var',
      VariableTypes.STRING,
      'test',
      state4.variables
    );
    verifyVariable('bool_var', VariableTypes.BOOLEAN, true, state4.variables);
    verifyVariable(
      'color_var',
      VariableTypes.COLOUR,
      { red: 170, green: 0, blue: 170 },
      state4.variables
    );
  });
});
