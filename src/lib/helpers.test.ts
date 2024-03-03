import { slug, isClientSide, isProduction, isDeployed, isServerSide, cl } from './helpers';

describe('helpers', () => {
  test('slug()', async () => {
    const real = slug('Hi, how are you?');
    const expected = 'hi-how-are-you';
    expect(real).toBe(expected);
  });

  test('isClientSide()', async () => {
    expect(isClientSide()).toBe(false);
  });

  test('isServerSide()', async () => {
    expect(isServerSide()).toBe(true);
  });

  test('isProduction()', async () => {
    expect(isProduction()).toBe(false);
    process.env.CONTEXT = 'production';
    expect(isProduction()).toBe(true);
  });

  test('isDeployed()', async () => {
    expect(isDeployed()).toBe(false);
    process.env.NETLIFY = 'true';
    expect(isDeployed()).toBe(true);
  });

  test('cl``', async () => {
    const out = cl`
    test
    new
    lines
    `;
    expect(out).toBe('test new lines');
  });
});
