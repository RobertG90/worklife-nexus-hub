
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera } from 'lucide-react';
import { useToastContext } from '@/components/ui/toast-provider';

export function MaintenanceForm() {
  const [formData, setFormData] = useState({
    issueType: 'electrical',
    location: '',
    priority: 'medium',
    description: '',
    photos: [] as File[]
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToastContext();

  const issueTypes = [
    { id: 'electrical', label: 'Electrical', icon: '⚡' },
    { id: 'plumbing', label: 'Plumbing', icon: '🚿' },
    { id: 'hvac', label: 'HVAC', icon: '❄️' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'cleaning', label: 'Cleaning', icon: '🧹' },
    { id: 'other', label: 'Other', icon: '🔧' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.description.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide a description of the issue',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: 'Maintenance Request Submitted!',
        description: 'Your request has been assigned to the appropriate team. You\'ll receive updates via email.',
        variant: 'success'
      });
      setFormData({
        issueType: 'electrical',
        location: '',
        priority: 'medium',
        description: '',
        photos: []
      });
      setLoading(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({...formData, photos: [...formData.photos, ...files]});
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Report Maintenance Issue</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Issue Category</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {issueTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({...formData, issueType: type.id})}
                className={
                  formData.issueType === type.id
                    ? 'p-3 rounded-lg border border-orange-500 bg-orange-50 text-orange-700 text-center transition-colors'
                    : 'p-3 rounded-lg border border-gray-200 hover:border-gray-300 text-center transition-colors'
                }
              >
                <div className="text-xl mb-1">{type.icon}</div>
                <div className="text-sm font-medium">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select location</option>
              <option value="floor1-lobby">Floor 1 - Lobby</option>
              <option value="floor1-kitchen">Floor 1 - Kitchen</option>
              <option value="floor1-bathroom">Floor 1 - Bathroom</option>
              <option value="floor2-office">Floor 2 - Open Office</option>
              <option value="floor2-conference">Floor 2 - Conference Rooms</option>
              <option value="floor2-break">Floor 2 - Break Room</option>
              <option value="floor3-executive">Floor 3 - Executive Offices</option>
              <option value="parking">Parking Garage</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
            <select 
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="low">Low - Can wait</option>
              <option value="medium">Medium - Should be fixed soon</option>
              <option value="high">High - Urgent</option>
              <option value="emergency">Emergency - Safety issue</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
          <Textarea 
            placeholder="Please describe the issue in detail..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo Evidence (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
            </label>
            {formData.photos.length > 0 && (
              <div className="mt-3 text-sm text-green-600">
                {formData.photos.length} photo(s) selected
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          {loading ? 'Submitting...' : 'Submit Maintenance Request'}
        </Button>
      </form>
    </Card>
  );
}
