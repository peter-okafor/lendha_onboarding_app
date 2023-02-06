import { useEffect, useState } from 'react';

interface Dropdown {
  [index: string]: string;
}

// TODO: finish this
const useToggleDropdown = (dropdowns: Dropdown[], filterId: string) => {
  const [dropdownIndexes, setDropdownIndexes] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (dropdownIndexes.includes(filterId)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [dropdownIndexes, filterId]);

  const handleDropdown = () => {
    setDropdownIndexes(
      dropdownIndexes.includes(filterId)
        ? dropdownIndexes.filter((id) => id !== id)
        : [...dropdownIndexes, filterId]
    );
  };

  return {
    isOpen,
    dropdowns,
    handleDropdown
  };
};

export default useToggleDropdown;
