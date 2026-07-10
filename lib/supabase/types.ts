export type QuoteStatus =
  | "received"
  | "in_review"
  | "quote_sent"
  | "validated"
  | "rejected";

export type UserRole = "client" | "admin";

export type ClaimStatus = "open" | "in_progress" | "resolved" | "rejected";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          company: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          company?: string | null;
          phone?: string | null;
          role?: UserRole;
        };
        Update: {
          full_name?: string | null;
          company?: string | null;
          phone?: string | null;
          role?: UserRole;
        };
        Relationships: [];
      };
      quote_requests: {
        Row: {
          id: string;
          client_id: string | null;
          full_name: string;
          company: string | null;
          email: string;
          phone: string;
          assistance_type: string;
          equipment_type: string | null;
          power_kva: number | null;
          location: string | null;
          description: string;
          status: QuoteStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          client_id?: string | null;
          full_name: string;
          company?: string | null;
          email: string;
          phone: string;
          assistance_type: string;
          equipment_type?: string | null;
          power_kva?: number | null;
          location?: string | null;
          description: string;
          status?: QuoteStatus;
        };
        Update: {
          status?: QuoteStatus;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          quote_request_id: string;
          sender_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          quote_request_id: string;
          sender_id: string;
          body: string;
        };
        Update: never;
        Relationships: [];
      };
      claims: {
        Row: {
          id: string;
          quote_request_id: string;
          client_id: string;
          subject: string;
          description: string;
          status: ClaimStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          quote_request_id: string;
          client_id: string;
          subject: string;
          description: string;
          status?: ClaimStatus;
        };
        Update: {
          status?: ClaimStatus;
        };
        Relationships: [];
      };
      claim_messages: {
        Row: {
          id: string;
          claim_id: string;
          sender_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          claim_id: string;
          sender_id: string;
          body: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
