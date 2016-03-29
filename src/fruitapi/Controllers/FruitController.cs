using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using fruitapi.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace fruitapi.Controllers
{
    

    [Route("api/[controller]")]
    public class FruitController : Controller
    {
        static List<Fruit> _fruit = new List<Fruit>()
        {
            new Fruit()
            {
                Name = "Apple",
                Red = 255,
                Green = 0,
                Blue = 0,
                Description = "Keeps the doctor away",
                Id = 1
            },
            new Fruit()
            {
                Name = "Orange",
                Red = 255,
                Green = 135,
                Blue = 0,
                Description = "Makes the best juice",
                Id = 2
            },
            new Fruit()
            {
                Name = "Grape",
                Red = 120,
                Green = 0,
                Blue = 128,
                Description = "Also is good juice",
                Id = 3
            }
        };

        static int _id = _fruit.Max(f => f.Id) + 1;

        // GET: api/fruit
        [HttpGet]
        public IEnumerable<Fruit> Get()
        {
            return _fruit;
        }

        // GET api/fruit/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Fruit requestedFruit = _fruit.Find(f => f.Id == id);

            if (requestedFruit == null)
            {
                return HttpBadRequest();
            }
            return Ok(requestedFruit);

        }

        // POST api/fruit
        [HttpPost]
        public IActionResult Post([FromBody]Fruit fruitToAdd)
        {
            if (fruitToAdd == null)
            {
                return HttpBadRequest();
            }
            fruitToAdd.Id = _id;
            _id++;
            _fruit.Add(fruitToAdd);
            return Ok();
        }

        // PUT api/fruit/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Fruit editedFruit)
        {
            Fruit fruitToEdit = _fruit.Find(f => f.Id == id);
            if (fruitToEdit == null)
            {
                return HttpBadRequest();
            }
            fruitToEdit.Name = editedFruit.Name;
            fruitToEdit.Red = editedFruit.Red;
            fruitToEdit.Green = editedFruit.Green;
            fruitToEdit.Blue = editedFruit.Blue;
            fruitToEdit.Description = editedFruit.Description;
            return Ok();
        }

        // DELETE api/fruit/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Fruit fruitToDelete = _fruit.Find(f => f.Id == id);
            if (fruitToDelete == null)
            {
                return HttpBadRequest();
            }
            _fruit.Remove(fruitToDelete);
            return Ok();
        }
    }
}
