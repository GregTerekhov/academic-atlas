import { getAdaptedContacts } from 'data';
import { PositionInLayout, IconName } from 'types';

describe('getAdaptedContacts', () => {
  it('returns filtered contact links for Header variant', () => {
    const result = getAdaptedContacts(PositionInLayout.Header);

    expect(result).not.toContainEqual(expect.objectContaining({ iconName: IconName.Call }));
  });

  it('returns all contact links for Footer variant', () => {
    const result = getAdaptedContacts(PositionInLayout.Footer);

    expect(result).toContainEqual(expect.objectContaining({ iconName: IconName.Call }));
  });
});
