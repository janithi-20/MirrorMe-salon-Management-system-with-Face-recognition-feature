// Service index for booking dropdowns — keep synchronized with pages if you edit services.

const ServiceIndex = [
  { key: 'Haircut & Styling', id: 'haircut', subs: [
    { id: 'adv-restyle', label: 'Cut & Re-Style (Advance)', price: 4000 },
    { id: 'fringe', label: 'Fringe Cut', price: 1000 },
    { id: 'trim', label: 'Trim', price: 1400 },
    { id: 'reg-restyle', label: 'Cut & Re-Style (Regular)', price: 2900 },
    { id: 'wash-blast', label: 'Hair Wash & Blast Dry', price: 2000 },
    { id: 'blow-short', label: 'Blow Dry - Short', price: 2400 },
    { id: 'blow-medium', label: 'Blow Dry - Medium', price: 3900 },
    { id: 'blow-long', label: 'Blow Dry - Long', price: 4500 },
    { id: 'braid-short', label: 'Braiding Per Strand - Short', price: 1300 }
  ]},
  { key: 'Waxing', id: 'waxing', subs: [
    { id: 'full-body', label: 'Full Body', price: 5900 },
    { id: 'stomach', label: 'Stomach', price: 950 },
    { id: 'half-leg', label: 'Half Leg', price: 1450 },
    { id: 'half-arms', label: 'Half Arms', price: 1350 },
    { id: 'classic-full-legs', label: 'Classic Full Legs', price: 2200 },
    { id: 'classic-full-arms', label: 'Classic Full Arms', price: 1800 }
  ]},
  { key: 'Skin Treatments', id: 'skin', subs: [
    { id: 'face-shave', label: 'Face Shaving', price: 4400 },
    { id: 'upper-thread', label: 'Upper Threading', price: 200 },
    { id: 'galvanic', label: 'Galvanic Treatment', price: 1400 },
    { id: 'classic-clean', label: 'Classic Clean Up', price: 3800 },
    { id: 'brightening', label: 'Brightening Clean Up', price: 6800 },
    { id: 'basic-clean', label: 'Basic Clean Up', price: 9800 }
  ]},
  { key: 'Nails', id: 'nails', subs: [
    { id: 'gel-individual', label: 'Gel Individual', price: 900 },
    { id: 'gel-soak-off', label: 'Gel Nail Soak Off', price: 1700 },
    { id: 'normal-color', label: 'Normal Color', price: 1100 },
    { id: 'gel-color-express', label: 'Gel Color (Express Mani)', price: 2300 },
    { id: 'nail-art', label: 'Nail Art Rein Stone/Sticker/ Each', price: 1800 }
  ]},
  { key: 'Manicure & Pedicure', id: 'manicure-pedicure', subs: [
    { id: 'luxury-pedi', label: 'Luxury Pedicure - Massage Chair', price: 8100 },
    { id: 'premium-pedi', label: 'Premium Pedicure', price: 6800 },
    { id: 'classic-mani', label: 'Classic Manicure', price: 2300 },
    { id: 'classic-pedi', label: 'Classic Pedicure', price: 2300 },
    { id: 'spa-mani', label: 'Spa Manicure', price: 4400 },
    { id: 'spa-pedi', label: 'Spa Pedicure', price: 4800 },
    { id: 'soak-up-pedi', label: 'Soak Up Pedicure', price: 5800 }
  ]},
  { key: 'Dressings & Make-Up', id: 'dressings', subs: [
    { id: 'full-early', label: 'Full Dressing (Early Morning)', price: 2500 },
    { id: 'full-derma', label: 'Full Dressing Derma', price: 6500 },
    { id: 'full-mac', label: 'Full Dressing Mac', price: 10300 },
    { id: 'saree', label: 'Saree Draping', price: 2000 },
    { id: 'makeup-mac', label: 'Make-Up (Mac)', price: 8000 },
    { id: 'makeup-derma', label: 'Make-Up (Derma)', price: 4200 },
    { id: 'hairstyle', label: 'Hair Style', price: 3100 },
    { id: 'addon-lashes', label: 'Add-on Eye Lashes', price: 1800 }
  ]}
];

export default ServiceIndex;
