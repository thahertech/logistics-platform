const Stepper = ({ steps, activeStep }) => (
  <div className="mb-4 flex justify-between items-center">
    {steps.map((label, index) => (
      <div key={label} className="text-center flex flex-col items-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold 
            ${activeStep >= index ? 'bg-blue-500' : 'bg-gray-400'}`}
          aria-current={activeStep === index ? 'step' : undefined}
        >
          {index + 1}
        </div>
        <span 
          className={`text-xs mt-2 ${activeStep >= index ? 'text-blue-500' : 'text-gray-300'}`}
          aria-label={label}
        >
          {label}
        </span>
      </div>
    ))}
  </div>
);

export default Stepper;