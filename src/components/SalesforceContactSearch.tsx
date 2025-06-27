
import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
}

interface SalesforceContactSearchProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const SalesforceContactSearch = ({ value, onValueChange, placeholder = "Search contacts..." }: SalesforceContactSearchProps) => {
  const [open, setOpen] = useState(false);
  
  // Mock Salesforce contacts - in a real app, this would come from an API
  const mockContacts: Contact[] = [
    { id: "003XX000004TmiQYAS", name: "John Smith", email: "john.smith@techcorp.com", company: "TechCorp" },
    { id: "003XX000004TmiRYAS", name: "Sarah Johnson", email: "sarah.j@innovatetech.com", company: "InnovateTech" },
    { id: "003XX000004TmiSYAS", name: "Mike Davis", email: "mike.davis@globaltech.com", company: "GlobalTech" },
    { id: "003XX000004TmiTYAS", name: "Lisa Chen", email: "lisa.chen@futuretech.com", company: "FutureTech" },
    { id: "003XX000004TmiUYAS", name: "David Wilson", email: "d.wilson@smartsolutions.com", company: "Smart Solutions" },
  ];

  const selectedContact = mockContacts.find(contact => contact.id === value);

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
              <span>{selectedContact.name} - {selectedContact.company}</span>
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
            <CommandEmpty>No contacts found.</CommandEmpty>
            <CommandGroup>
              {mockContacts.map((contact) => (
                <CommandItem
                  key={contact.id}
                  value={`${contact.name} ${contact.email} ${contact.company}`}
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
                    <span className="text-xs text-muted-foreground">{contact.email} • {contact.company}</span>
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

export default SalesforceContactSearch;
