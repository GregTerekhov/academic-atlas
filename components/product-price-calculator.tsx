import { MobileMenuTemplate, ModalTemplate } from 'template';
import { DropdownUI, InputUI } from 'ui';

export default function PriceCalculator() {
  return (
    <>
      <MobileMenuTemplate>
        <p>Меню Дізнатись вартість</p>
        <DropdownUI />
        <DropdownUI />
        <DropdownUI />
        <InputUI />
        <InputUI />
        <InputUI />
      </MobileMenuTemplate>
      <ModalTemplate>
        <p>Меню Дізнатись вартість</p>
        <DropdownUI />
        <DropdownUI />
        <DropdownUI />
        <InputUI />
        <InputUI />
        <InputUI />
      </ModalTemplate>
    </>
  );
}
