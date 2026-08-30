Vider toute la liste de courses en un clic.
Retirer uniquement les ingrédients déjà cochés "acheté" (plus ciblé que tout vider).
Supprimer tous les repas planifiés d'un coup depuis la vue repas (reset de semaine).
Tout marquer "acheté" / tout marquer "réalisé" en un clic (symétrique du bulk delete, sur l'état plutôt que la suppression).
Quantités/unités sur les ingrédients — aujourd'hui un ingrédient n'a qu'un nom (recette comme liste de courses). Sans quantité, la liste de courses reste une liste de noms, pas vraiment exploitable pour faire les courses sérieusement.
Rayon/catégorie sur un ingrédient (fruits & légumes, épicerie, frais...) pour grouper la liste de courses par rayon de magasin plutôt qu'en vrac.
Étapes de préparation sur une recette — actuellement une recette n'est qu'un nom + une liste d'ingrédients, sans le "comment on cuisine ça".
Planification datée (jour/semaine) au lieu d'une liste plate de repas planifiés/non planifiés — un vrai calendrier de la semaine, pas juste un statut booléen.
Portions ajustables — nombre de personnes sur une recette, avec recalcul des quantités quand on planifie pour 2 vs 6.
Partage entre appareils — l'identification se fait par X-Device-Id local (pas de compte), donc pas moyen que deux personnes d'un même foyer partagent la même liste de courses en temps réel.
Tags sur les recettes (végé, rapide, dessert...) pour filtrer par contrainte du moment plutôt que parcourir toute la liste.
Historique de planification — "cuisiné il y a 3 semaines" pour éviter de replanifier la même chose trop souvent, ou au contraire retrouver vite un plat oublié.
Duplication de recette — partir d'une recette existante pour en créer une variante, plutôt que retaper tous les ingrédients à la main.
Badge "prêt à cuisiner" visible directement sur un repas replié (pas besoin de le déplier pour savoir si tous ses ingrédients sont déjà achetés) — nécessite que la liste des repas expose cette info calculée côté back (aujourd'hui `GET /gohan/recipes` ne renvoie pas le détail des ingrédients, seulement au `GET /gohan/recipes/{id}`).
