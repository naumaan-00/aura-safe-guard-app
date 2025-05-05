
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ArrowLeft, Trash2, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const Contacts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, this would come from a database or storage
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Jane Smith', phone: '+1 (555) 123-4567', relation: 'Sister' },
    { id: '2', name: 'Mary Johnson', phone: '+1 (555) 765-4321', relation: 'Friend' },
  ]);
  
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '',
    phone: '',
    relation: ''
  });
  
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        relation: newContact.relation || 'Contact'
      };
      
      setContacts([...contacts, contact]);
      setNewContact({ name: '', phone: '', relation: '' });
      setIsAdding(false);
      
      toast({
        title: "Contact Added",
        description: `${contact.name} has been added to your emergency contacts.`
      });
    }
  };
  
  const handleDeleteContact = (id: string) => {
    const contactToDelete = contacts.find(c => c.id === id);
    setContacts(contacts.filter(contact => contact.id !== id));
    
    toast({
      title: "Contact Removed",
      description: `${contactToDelete?.name} has been removed from your emergency contacts.`
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4">
      <header className="flex items-center py-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Emergency Contacts</h1>
      </header>
      
      <main className="mt-4 space-y-4">
        {contacts.map(contact => (
          <Card key={contact.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{contact.relation}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                <Trash2 className="h-5 w-5 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
        
        {isAdding ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={newContact.name} 
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})} 
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={newContact.phone} 
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})} 
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                />
              </div>
              <div>
                <Label htmlFor="relation">Relationship</Label>
                <Input 
                  id="relation" 
                  value={newContact.relation} 
                  onChange={(e) => setNewContact({...newContact, relation: e.target.value})} 
                  placeholder="Family, Friend, etc."
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddContact} className="flex-1">Save Contact</Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button 
            className="w-full flex items-center justify-center gap-2" 
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4" /> Add Emergency Contact
          </Button>
        )}
      </main>
    </div>
  );
};

export default Contacts;
