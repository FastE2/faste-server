if [ "$1" = "create" ]; then
  npx prisma migrate dev --create-only
else
  npx prisma migrate dev
fi
