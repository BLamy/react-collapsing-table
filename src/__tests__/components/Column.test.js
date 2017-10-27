//React
import React from 'react';
//Component
import Column from '../../components/table/Column';
//Testing
import { shallow, } from 'enzyme';

describe('Column', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            accessor: 'firstName',
            label: 'First Name',
        };

        wrapper = shallow(<Column { ...props } />);
    });

    it('should have 1 table header', () => {
        const ths = wrapper.find('th');

        expect(ths.length).toBe(1);
    });

    it('should have a specific css class for the table header', () => {
        const th = wrapper.find('th');

        expect(th.hasClass('column-firstName')).toEqual(true);
    });

    it('should have First Name displayed in the table header', () => {
        const thText = wrapper.find('th').text();

        expect(thText).toBe('First Name');
    });
});