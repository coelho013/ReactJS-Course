import { render, screen } from "@testing-library/react";
import { Button } from ".";
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
    
    it('should render the button with then text "Load more"', () => {
        render(<Button text="Load more" />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toHaveAttribute('class', 'button');
    })
    

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);
        
        const button = screen.getByRole('button', { name: /load more/i });

        userEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    })

    it('should be disabled when disabled is true', () => {
        render(<Button text="Load more" disabled={true} />);
        
        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeDisabled(0);
    })
});