
import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getContactsByCompanyId } from '@/utils/mockSalesforceData';

interface SalesforceContactByCompanySearchProps {
  companyId: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const SalesforceContactByCompanySearch = ({ 
  companyId, 
  value, 
  onValueChange, 
  placeholder = "Search contacts..." 
}: SalesforceContactByCompanySearchProps) => {
  const [open, setOpen] = useState(false);
  
  const contacts = getContactsByCompanyId(companyId);
  const selectedContact = contacts.find(contact => contact.id === value);

  if (!companyId) {
    return (
      <Button variant="outline" disabled className="w-full justify-between">
        Select a company first
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedContact ? (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{selectedContact.name} - {selectedContact.title}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search contacts..." />
          <CommandList>
            <CommandEmpty>No contacts found for this company.</CommandEmpty>
            <CommandGroup>
              {contacts.map((contact) => (
                <CommandItem
                  key={contact.id}
                  value={`${contact.name} ${contact.title} ${contact.email}`}
                  onSelect={() => {
                    onValueChange(contact.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === contact.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-xs text-muted-foreground">{contact.title} • {contact.email}</span>
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

export default SalesforceContactByCompanySearch;
