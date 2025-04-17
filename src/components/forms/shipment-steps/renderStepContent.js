import SenderStep from './SenderStep';
import PickupStep from './PickupStep';
import RecipientStep from './RecipientStep';
import ShipmentStep from './ShipmentStep';
import FinalStep from './finalStep';

export const renderStepContent = ({
  step,
  form,
  handleChange,
  handleToggle,
  autoFillFlags,
  handleAddressSelect
}) => {
  switch (step) {
    case 0:
      return <SenderStep form={form} handleChange={handleChange} handleToggle={handleToggle} autoFillFlags={autoFillFlags} handleAddressSelect={handleAddressSelect} />;
    case 1:
      return <PickupStep form={form} handleChange={handleChange} handleToggle={handleToggle} autoFillFlags={autoFillFlags} handleAddressSelect={handleAddressSelect} />;
    case 2:
      return <RecipientStep form={form} handleChange={handleChange} handleToggle={handleToggle} autoFillFlags={autoFillFlags} handleAddressSelect={handleAddressSelect} />;
    case 3:
      return <ShipmentStep form={form} handleChange={handleChange} />;
    case 4:
      return <FinalStep form={form} handleChange={handleChange} />;
    default:
      return 'Tuntematon vaihe';
  }
};