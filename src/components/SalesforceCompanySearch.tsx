
import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockCompanies } from '@/utils/mockSalesforceData';

interface SalesforceCompanySearchProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const SalesforceCompanySearch = ({ value, onValueChange, placeholder = "Search companies..." }: SalesforceCompanySearchProps) => {
  const [open, setOpen] = useState(false);
  
  const selectedCompany = mockCompanies.find(company => company.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCompany ? (
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{selectedCompany.name} - {selectedCompany.industry}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search companies..." />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup>
              {mockCompanies.map((company) => (
                <CommandItem
                  key={company.id}
                  value={`${company.name} ${company.industry} ${company.website}`}
                  onSelect={() => {
                    onValueChange(company.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === company.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{company.name}</span>
                    <span className="text-xs text-muted-foreground">{company.industry} • {company.employees} employees</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SalesforceCompanySearch;
