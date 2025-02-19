"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

interface ImportListingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportListingsModal({
  isOpen,
  onClose
}: ImportListingsModalProps) {
  const [importMethod, setImportMethod] = useState("manual")

  const handleImport = () => {
    // Implement import logic here
    console.log("Importing listings...")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Listings</DialogTitle>
          <DialogDescription>
            Choose how you want to import your listings. You can either connect
            to a platform or enter details manually.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="import-method">Import Method</Label>
            <Select value={importMethod} onValueChange={setImportMethod}>
              <SelectTrigger id="import-method">
                <SelectValue placeholder="Select import method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="airbnb">Airbnb</SelectItem>
                <SelectItem value="vrbo">VRBO</SelectItem>
                <SelectItem value="manual">Manual Entry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {importMethod === "manual" && (
            <div className="space-y-2">
              <Label htmlFor="property-name">Property Name</Label>
              <Input id="property-name" placeholder="Enter property name" />
            </div>
          )}
          <Button onClick={handleImport} className="w-full">
            Start Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
