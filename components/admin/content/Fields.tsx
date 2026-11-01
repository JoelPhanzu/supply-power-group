"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ArrowDown, ArrowUp, Plus, Trash, UploadSimple } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import type { FieldDef, SiteImage } from "@/lib/content/schema";

type Obj = Record<string, unknown>;

const inputClass =
  "w-full rounded-lg border border-border-soft bg-navy-700 px-3.5 py-2.5 text-sm text-text-main placeholder:text-text-faint focus:border-accent-500 focus:outline-none";

const smallBtn =
  "inline-flex items-center justify-center rounded-lg border border-border-soft p-1.5 text-text-mute hover:text-text-main disabled:opacity-30";

function Label({ children, help }: { children: React.ReactNode; help?: string }) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-semibold text-text-main">{children}</label>
      {help && <p className="mt-0.5 text-xs text-text-faint">{help}</p>}
    </div>
  );
}

function emptyFor(fields: FieldDef[]): unknown {
  // Liste d'images "nues" (champ sans clé) : l'élément est l'image elle-même.
  if (fields.length === 1 && fields[0].key === "") return emptyValue(fields[0]);
  const obj: Obj = {};
  for (const f of fields) obj[f.key] = emptyValue(f);
  return obj;
}

function emptyValue(field: FieldDef): unknown {
  switch (field.type) {
    case "image":
      return { url: "", alt: "" };
    case "select":
      return field.options[0]?.value ?? "";
    case "stringList":
    case "list":
      return [];
    default:
      return "";
  }
}

function move<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function FieldsEditor({
  fields,
  value,
  onChange,
}: {
  fields: FieldDef[];
  value: Obj;
  onChange: (next: Obj) => void;
}) {
  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <Field
          key={field.key}
          field={field}
          value={value?.[field.key]}
          onChange={(v) => onChange({ ...value, [field.key]: v })}
        />
      ))}
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <input
            className={inputClass}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case "textarea":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <textarea
            className={`${inputClass} resize-y`}
            rows={4}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case "select":
      return (
        <div>
          <Label>{field.label}</Label>
          <select
            className={inputClass}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          >
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "image":
      return (
        <ImageField
          label={field.label}
          help={field.help}
          value={(value as SiteImage) ?? { url: "", alt: "" }}
          onChange={onChange}
        />
      );
    case "stringList":
      return (
        <StringListField
          label={field.label}
          itemLabel={field.itemLabel}
          multiline={field.multiline}
          value={(value as string[]) ?? []}
          onChange={onChange}
        />
      );
    case "list":
      return <ListField field={field} value={(value as unknown[]) ?? []} onChange={onChange} />;
  }
}

function StringListField({
  label,
  itemLabel,
  multiline,
  value,
  onChange,
}: {
  label: string;
  itemLabel: string;
  multiline?: boolean;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                className={`${inputClass} resize-y`}
                rows={4}
                value={item}
                onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
              />
            ) : (
              <input
                className={inputClass}
                value={item}
                onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
              />
            )}
            <ItemActions
              index={i}
              count={value.length}
              onMove={(to) => onChange(move(value, i, to))}
              onRemove={() => onChange(value.filter((_, j) => j !== i))}
            />
          </div>
        ))}
      </div>
      <AddButton label={itemLabel} onClick={() => onChange([...value, ""])} />
    </div>
  );
}

function ListField({
  field,
  value,
  onChange,
}: {
  field: Extract<FieldDef, { type: "list" }>;
  value: unknown[];
  onChange: (v: unknown[]) => void;
}) {
  const bare = field.fields.length === 1 && field.fields[0].key === "";

  return (
    <div>
      <Label>{field.label}</Label>
      <div className="space-y-4">
        {value.map((item, i) => (
          <div key={i} className="rounded-xl border border-border-soft bg-navy-900/60 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">
                {field.itemLabel} {i + 1}
              </p>
              <ItemActions
                index={i}
                count={value.length}
                onMove={(to) => onChange(move(value, i, to))}
                onRemove={() => {
                  if (confirm(`Supprimer cet élément (${field.itemLabel} ${i + 1}) ?`)) {
                    onChange(value.filter((_, j) => j !== i));
                  }
                }}
              />
            </div>
            {bare ? (
              <Field
                field={field.fields[0]}
                value={item}
                onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))}
              />
            ) : (
              <FieldsEditor
                fields={field.fields}
                value={item as Obj}
                onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))}
              />
            )}
          </div>
        ))}
      </div>
      <AddButton label={field.itemLabel} onClick={() => onChange([...value, emptyFor(field.fields)])} />
    </div>
  );
}

function ItemActions({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-shrink-0 gap-1">
      <button type="button" title="Monter" className={smallBtn} disabled={index === 0} onClick={() => onMove(index - 1)}>
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Descendre"
        className={smallBtn}
        disabled={index === count - 1}
        onClick={() => onMove(index + 1)}
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <button type="button" title="Supprimer" className={`${smallBtn} hover:text-red-300`} onClick={onRemove}>
        <Trash className="h-4 w-4" />
      </button>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-border-soft px-4 py-2 text-sm text-text-mute hover:border-accent-500/50 hover:text-text-main"
    >
      <Plus className="h-4 w-4" /> Ajouter : {label.toLowerCase()}
    </button>
  );
}

const MAX_SIZE = 10 * 1024 * 1024;

function ImageField({
  label,
  help,
  value,
  onChange,
}: {
  label: string;
  help?: string;
  value: SiteImage;
  onChange: (v: SiteImage) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image (JPG, PNG, WebP...).");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Image trop lourde (10 Mo maximum).");
      return;
    }

    setUploading(true);
    setError(null);
    const supabase = createClient();
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("site-media")
      .upload(path, file, { contentType: file.type, cacheControl: "31536000" });

    setUploading(false);
    if (uploadError) {
      console.error(uploadError);
      setError("Envoi impossible. Vérifiez votre connexion et réessayez.");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("site-media").getPublicUrl(path);
    onChange({ ...value, url: publicUrl });
  }

  return (
    <div>
      <Label help={help}>{label}</Label>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex h-32 w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-soft bg-navy-900 sm:w-48">
          {value.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.url} alt={value.alt} className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-text-faint">Aucune image</span>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-4 py-2 text-sm font-medium text-text-main hover:bg-navy-500 disabled:opacity-60"
            >
              <UploadSimple className="h-4 w-4" />
              {uploading ? "Envoi en cours..." : "Changer la photo"}
            </button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>
          <input
            className={inputClass}
            placeholder="Description de l'image (accessibilité, Google)"
            value={value.alt ?? ""}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
          />
          <details className="text-xs text-text-faint">
            <summary className="cursor-pointer hover:text-text-mute">Utiliser un lien d&apos;image</summary>
            <input
              className={`${inputClass} mt-2`}
              placeholder="https://..."
              value={value.url ?? ""}
              onChange={(e) => onChange({ ...value, url: e.target.value })}
            />
          </details>
          {error && <p className="text-xs text-red-300">{error}</p>}
        </div>
      </div>
    </div>
  );
}
