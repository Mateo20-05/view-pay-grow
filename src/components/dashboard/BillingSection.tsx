import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Download, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Receipt,
  Plus,
  AlertCircle
} from "lucide-react";

const currentBalance = 12450;
const monthlySpend = 8750;
const monthlyBudget = 15000;

const transactions = [
  {
    id: "txn_001",
    date: "2024-01-19",
    description: "Campaign Payment - Summer Fashion Collection",
    amount: -1200,
    status: "completed",
    campaign: "Summer Fashion Collection",
    creator: "Sarah Johnson"
  },
  {
    id: "txn_002", 
    date: "2024-01-18",
    description: "Account Top-up",
    amount: 5000,
    status: "completed",
    campaign: null,
    creator: null
  },
  {
    id: "txn_003",
    date: "2024-01-17",
    description: "Campaign Payment - Tech Product Launch",
    amount: -2500,
    status: "completed",
    campaign: "Tech Product Launch",
    creator: "Mike Chen"
  },
  {
    id: "txn_004",
    date: "2024-01-16",
    description: "Campaign Payment - Holiday Promotion",
    amount: -800,
    status: "pending",
    campaign: "Holiday Promotion", 
    creator: "Emma Davis"
  },
  {
    id: "txn_005",
    date: "2024-01-15",
    description: "Monthly Plan - Professional",
    amount: -299,
    status: "completed",
    campaign: null,
    creator: null
  }
];

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true
  },
  {
    id: 2,
    type: "Mastercard", 
    last4: "8888",
    expiry: "08/26",
    isDefault: false
  }
];

export function BillingSection() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-500";
      case "pending": return "bg-orange-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Balance & Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Account Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">${currentBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available for campaigns</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month's Spend
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">${monthlySpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((monthlySpend / monthlyBudget) * 100)}% of monthly budget
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Budget
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">${monthlyBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ${(monthlyBudget - monthlySpend).toLocaleString()} remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Progress</CardTitle>
          <CardDescription>Track your spending against your monthly budget</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Spent: ${monthlySpend.toLocaleString()}</span>
              <span>Budget: ${monthlyBudget.toLocaleString()}</span>
            </div>
            <Progress value={(monthlySpend / monthlyBudget) * 100} />
            <div className="flex items-center space-x-2 text-sm">
              {monthlySpend / monthlyBudget > 0.8 && (
                <>
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-600">
                    You've used {Math.round((monthlySpend / monthlyBudget) * 100)}% of your monthly budget
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Funds
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Payment Methods
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
      </div>

      {/* Detailed Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Details</CardTitle>
          <CardDescription>Transaction history and payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-4">
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{transaction.description}</span>
                        </div>
                        <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {(transaction.campaign || transaction.creator) && (
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {transaction.campaign && (
                          <span>Campaign: {transaction.campaign}</span>
                        )}
                        {transaction.creator && (
                          <span>Creator: {transaction.creator}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline">Load More Transactions</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="methods" className="space-y-4">
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{method.type} ending in {method.last4}</p>
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                        {method.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Payment Method
              </Button>
            </TabsContent>
            
            <TabsContent value="invoices" className="space-y-4">
              <div className="space-y-3">
                {[
                  { id: "INV-001", date: "2024-01-15", amount: 299, status: "Paid", description: "Monthly Plan - Professional" },
                  { id: "INV-002", date: "2023-12-15", amount: 299, status: "Paid", description: "Monthly Plan - Professional" },
                  { id: "INV-003", date: "2023-11-15", amount: 299, status: "Paid", description: "Monthly Plan - Professional" },
                ].map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.description}</p>
                        <p className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${invoice.amount}</p>
                        <Badge variant="secondary">{invoice.status}</Badge>
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}