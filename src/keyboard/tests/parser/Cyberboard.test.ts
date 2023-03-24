import { Cyberboard } from '../../parser/Cyberboard';
import { readJSON } from '../../parser/reader';



describe('Cyberboard', () => {
  test('it processes a valid config file', async () => {
    const validJsonConfig = await readJSON('./src/keyboard/tests/parser/valid.json');
    new Cyberboard(validJsonConfig);
  });
});
