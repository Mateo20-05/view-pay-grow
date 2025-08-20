import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormMessage } from "@/components/ui/form";
import { CampaignFormData } from "@/lib/schemas/campaign-schema";
import { CheckCircle, XCircle, Plus, X } from "lucide-react";
import { motion } from "framer-motion";

interface DosDontsStepProps {
  onAutoSave: () => void;
}

export function DosDontsStep({ onAutoSave }: DosDontsStepProps) {
  const form = useFormContext<CampaignFormData>();
  const { watch, setValue } = form;
  
  const [newDo, setNewDo] = useState("");
  const [newDont, setNewDont] = useState("");
  
  const watchedData = watch();
  const { dos, donts } = watchedData;

  const addDo = () => {
    if (newDo.trim()) {
      setValue("dos", [...dos, newDo.trim()]);
      setNewDo("");
      onAutoSave();
    }
  };

  const removeDo = (index: number) => {
    const newDos = dos.filter((_, i) => i !== index);
    setValue("dos", newDos);
    onAutoSave();
  };

  const addDont = () => {
    if (newDont.trim()) {
      setValue("donts", [...donts, newDont.trim()]);
      setNewDont("");
      onAutoSave();
    }
  };

  const removeDont = (index: number) => {
    const newDonts = donts.filter((_, i) => i !== index);
    setValue("donts", newDonts);
    onAutoSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Do's & Don'ts</h2>
        <p className="text-muted-foreground">
          Provide clear guidelines to help creators create content that aligns with your brand values and campaign goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Do's */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-600">
              <CheckCircle className="w-5 h-5" />
              Do's
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Include product link in description"
                  value={newDo}
                  onChange={(e) => setNewDo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDo()}
                />
                <Button onClick={addDo} size="sm" className="shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {dos.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-md border border-emerald-200 dark:border-emerald-800 group"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 flex-1">
                      {item}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDo(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {dos.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Add at least one "Do" guideline</p>
                <p className="text-sm">Help creators understand what you want them to include</p>
              </div>
            )}

            <FormField
              name="dos"
              render={() => (
                <FormMessage />
              )}
            />
          </CardContent>
        </Card>

        {/* Don'ts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Don'ts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Don't compare to competitors"
                  value={newDont}
                  onChange={(e) => setNewDont(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDont()}
                />
                <Button onClick={addDont} size="sm" className="shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {donts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-50 dark:bg-red-950/30 p-3 rounded-md border border-red-200 dark:border-red-800 group"
                >
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-800 dark:text-red-200 flex-1">
                      {item}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDont(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {donts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <XCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Add at least one "Don't" guideline</p>
                <p className="text-sm">Set clear boundaries for creators to follow</p>
              </div>
            )}

            <FormField
              name="donts"
              render={() => (
                <FormMessage />
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Guidelines Tips */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-emerald-600 mb-2">Effective Do's:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Be specific and actionable</li>
                <li>• Include brand mentions or product features</li>
                <li>• Suggest content angles or storytelling approaches</li>
                <li>• Provide technical requirements (lighting, audio, etc.)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600 mb-2">Clear Don'ts:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Mention competitor brands</li>
                <li>• Use inappropriate language or content</li>
                <li>• Make unauthorized product modifications</li>
                <li>• Share content before approval (if required)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}